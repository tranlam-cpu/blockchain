import { Injectable, NgZone } from '@angular/core';
import Web3 from 'web3';
import { Contract } from "web3-eth-contract";
import { Observable } from 'rxjs';
const contractAbi = require("./contractABI.json")
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private web3: Web3;
  private contract: Contract;
  private contractAddress ='0x65BBa8e901bC9803555e7ae68A81F2686f4a89cB';


  constructor(private zone: NgZone) {
    if(window.web3){
      this.web3 = new Web3(window.ethereum);
      this.contract = new this.web3.eth.Contract(
        contractAbi,
        this.contractAddress
      );

      window.ethereum.enable().catch((err: any)=>{
        console.log(err);
      });
    }else{
      console.warn('Metamask not found')
    }
  }

  getAccount(): Promise<string>{
    return this.web3.eth.getAccounts().then((accounts)=> accounts[0] || '')
  }

  async executeTransaction(fnName: string, ...args: any[]): Promise<void> {
    const acc= await this.getAccount();
    this.contract.methods[fnName](...args).send({from: acc});
  }

  async sendTransaction(fnName: string, amount: number,...args: any[]): Promise<void> {
    const acc= await this.getAccount();

     // Convert the amount to wei
    const amountInWei = this.web3.utils.toWei(amount.toString(), 'ether');

    this.contract.methods[fnName](...args).send({from: acc, value: amountInWei });
  }

  async call(fnName: string, ...args: any[]){
    const acc= await this.getAccount();
    return this.contract.methods[fnName](...args).call({from: acc});
  }

  onEvents(event: string){
    return new Observable((observer:any)=>{
      this.contract.events[event]().on("data",(data: any)=>{
        this.zone.run(()=>{
          observer.next({
            event: data.event,
            payload: data.returnValues,
          });
        });       
      });
    });
    
  }
}