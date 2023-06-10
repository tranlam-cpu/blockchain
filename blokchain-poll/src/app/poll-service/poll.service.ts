import { Injectable } from '@angular/core';
import { Observable, of, combineLatest} from 'rxjs';
import { Poll,PollForm  } from '../type';
import { delay, switchMap, map } from 'rxjs/operators';
import { Web3Service } from '../blockchain/web3.service';

import { fromAscii, toAscii } from 'web3-utils';

@Injectable({
  providedIn: 'root'
})
export class PollService {

  constructor(private web3: Web3Service) { }

  //getPolls(): Observable<Poll[]>

  async getPolls(): Promise<Poll[]> {
    const polls: Poll[] = [];

    const totalPolls = await this.web3.call('getTotalPolls');
    const acc = await this.web3.getAccount();
    const voter = await this.web3.call('getVoter',acc);
    const voterNormalized = this.normalizeVoter(voter);

    /*return of([
      {
        id: 1,
        question: 'Do you like dogs or cats?',
        thumbnail : 'https://d.newsweek.com/en/full/1898130/dog-cat-under-sheet.jpg?w=1600&h=1600&q=88&f=44b6c52482ebe72ccf3fe17f298588f7',
        options: ["Cats", "dogs", "none"],
        results: [0,5,7],
        voted: true,
      },
      {
        id: 2,
        question: 'Best month for sumer holiday>',
        thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXChih5me9_7h107jnjojMyllG2Af-RZ6UB5SOCxH_mYPM_GUmGTQFZc6UCnQWH-n6UuI&usqp=CAU',
        options: ['June','July','August'],
        results: [1,6,4],
        voted: false,
      }
    ]).pipe(delay(2000));*/

    for(let i=0; i< totalPolls; i++){
      const pollRaw = await this.web3.call("getPoll", i);
      const pollNormalized = this.normalizePoll(pollRaw, voterNormalized);
      polls.push(pollNormalized);
    }

    return polls;
  }

  vote(pollId: number, voteNumber: number){
    console.log(pollId, voteNumber);
    this.web3.executeTransaction('vote',pollId, voteNumber);
  }

  createPoll(poll: PollForm){
    console.log(poll);
    this.web3.executeTransaction(
      "createPoll",
      poll.question,
      poll.thumbnail || '',
      poll.options.map((opt) => fromAscii(opt))
    );
  }

  private normalizeVoter(voter:any){
    return {
      id: voter[0],
      votedIds: voter[1].map((vote:any) => parseInt(vote)),
    };
  }

  private normalizePoll(pollRaw:any, voter:any): Poll {
    return {
      id: parseInt(pollRaw[0]),
      question: pollRaw[1],
      thumbnail: pollRaw[2],
      results: pollRaw[3].map((vote:any) => parseInt(vote)),
      options: pollRaw[4].map((opt:any) => toAscii(opt).replace(/\u0000/g, '')),
      voted: voter.votedIds.length && voter.votedIds.find((votedId:any) => votedId === parseInt(pollRaw[0])) != undefined,
    };
  }


  onEvent(name: string){
    return this.web3.onEvents(name);
  }
}
