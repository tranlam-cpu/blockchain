import { Injectable } from '@angular/core';
import { Web3Service } from '../blockchain/web3.service';
import { FarmForm,Farm, Production, ProductionForm } from '../type';


@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private web3: Web3Service) { }

  async getFarms(): Promise<Farm[]> {
    const farms: Farm[] = [];

    const totalFarms = await this.web3.call('getTotalFarms');
    const acc = await this.web3.getAccount();
    

  

    for(let i=0; i< totalFarms; i++){
      const farmRaw = await this.web3.call("getFarm", i);
      const WalletRaw = await this.web3.call("getWallet", i);

      const walletNormalized = this.normalizeWallet(WalletRaw);

      const farmNormalized = this.normalizeFarm(farmRaw,walletNormalized);
      
      farms.push(farmNormalized);
    }
    return farms;
  }

  async getFarmsBuyer(): Promise<Farm[]> {
    const farms: Farm[] = [];

    const totalFarms = await this.web3.call('getTotalFarms');
    const acc = await this.web3.getAccount();

    const buyer=await this.web3.call('getBuyer',acc);

    const buyerNormalized = this.normalizeBuyer(buyer);
    
    const items: any[]=buyerNormalized.buyedIds;
    const buyedMaps: any[]=buyerNormalized.buyedMap;
    this.processItems(items,farms,buyedMaps);
    console.log(buyedMaps);
    return farms;
  }

  async processItems(items: any[],farms: Farm[],buyedMap: any[]) {
    var i=0;
    for (const item of items) {

      const farmRaw = await this.web3.call("getFarm", item);
      const farmBuyedNormalized = this.normalizeFarmBuyed(farmRaw,buyedMap[i]);

      i++;
      farms.push(farmBuyedNormalized);
    }
  
  }


  async getProductions(): Promise<Production[]> {
    const adress: any[] = [];
    const productions: Production[] = [];

    const totalProductions = await this.web3.call('getTotalProduction');
    const acc = await this.web3.getAccount();
    

  

    for(let i=0; i< totalProductions; i++){
      
      const AddressRaw = await this.web3.call("getProductionAddress", i);

      const AddressNormalized = this.normalizeWallet(AddressRaw);

      
      adress.push(AddressNormalized);
    }
    const result = adress.filter(obj => obj.wallet === acc).map(obj => parseInt(obj.id));
    

    this.processProduction(result,productions);
    console.log(productions);



     return productions;
  }

  async processProduction(items: any[],productions: Production[]) {
 
    for (const item of items) {

      const ProductionRaw = await this.web3.call("getProduction", item);
      const pNormalized = this.ProductionNormalized(ProductionRaw);

    
      productions.push(pNormalized);
    }
  
  }







  async createFarm(farm: FarmForm){
    const acc = await this.web3.getAccount();
    console.log(farm);
    this.web3.executeTransaction(
      "createFarm",
      farm.name,
      farm.thumbnail || '',
      farm.content || '',
      farm.company || '',
      farm.money || '',
      acc || ''
    );
  }
  
  async createProduction(production: ProductionForm){
    const acc = await this.web3.getAccount();
    console.log(production);
    console.log(acc);
    this.web3.executeTransaction(
      "createProduction",
      production.name,
      production.thumbnail || '',
      production.content || '',
      production.company || '',
      production.money || '',
      production.QR || '',
      acc || ''
    );
  }


  buy(wallet:any,money:any,id:any){
   
    this.web3.sendTransaction(
      "buy",
      money,
      wallet,
      money,
      id
    );

  }

  setActive(id:any){
    console.log(id);
    this.web3.executeTransaction("setActive",id);
    
  }

 private normalizeWallet(WalletRaw:any) {
    return {
      id: WalletRaw[0],
      wallet: WalletRaw[1]
    };
  }

  private normalizeFarm(farmRaw:any,Wallet:any): Farm {

    return {
      id: parseInt(farmRaw[0]),
      name: farmRaw[1],
      thumbnail: farmRaw[2],
      content: farmRaw[3],
      company: farmRaw[4],
      money: parseInt(farmRaw[5]),
      active: farmRaw[6],
      wallet: Wallet.wallet
    };
  }

  private normalizeFarmBuyed(farmRaw:any,buyedMap:any): Farm {

    return {
      id: parseInt(farmRaw[0]),
      name: farmRaw[1],
      thumbnail: farmRaw[2],
      content: farmRaw[3],
      company: farmRaw[4],
      money: parseInt(farmRaw[5]),
      active: buyedMap,
      wallet: ""
    };
  }



  private normalizeBuyer(buyer:any){
    return {
      id: buyer[0],
      buyedIds: buyer[1].map((buy:any) => parseInt(buy)),
      buyedMap: buyer[2]
    };
  }


  private ProductionNormalized(productionRaw:any): Production{
    return {
      id: parseInt(productionRaw[0]),
      name: productionRaw[1],
      thumbnail: productionRaw[2],
      content: productionRaw[3],
      company: productionRaw[4],
      money: parseInt(productionRaw[5]),
      QR: productionRaw[6],
      wallet: ""
    };
  }


  onEvent(name: string){
    return this.web3.onEvents(name);
  }
}
