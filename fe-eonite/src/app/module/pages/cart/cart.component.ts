import { Component, ViewChild, ViewChildren, QueryList} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditCartComponent } from '../dialog-edit-cart/dialog-edit-cart.component';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { HttpEventType } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DialogSuccessComponent } from '../dialog-success/dialog-success.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent{
  @ViewChild('outerSort', { static: true }) sort!: MatSort;
  @ViewChildren('innerSort') innerSort!: QueryList<MatSort>;
  @ViewChildren('innerTables') innerTables!: QueryList<MatTable<Product>>;
  listCart?:any[];
  data: any[]=[];
  tempId?:number;
  deleteItem:boolean = false;
  dataSource!: MatTableDataSource<Vendor>;
  cartData: Vendor[] = [];
  columnsToDisplay = ['image','name','action'];
  innerDisplayedColumns = ['select', 'productName', 'qty','date','price','action'];
  userSelection = new SelectionModel<any>(true, []);
  userSSelection = new SelectionModel<any>(true, []);
  userSelectionMap: Map<number, SelectionModel<any>> = new Map<number,SelectionModel<any>>();
  error:string='';

  constructor(private datePipe: DatePipe,private dialog:MatDialog, private restService:RestApiServiceService) {}

  ngOnInit() {
    this.getDataCart()
  }

  getDataCart(){
    this.data=[];
    let groupedData: any;
    this.restService.getCart(Number(sessionStorage.getItem('ID'))).subscribe((event)=>{
      if(event.type == HttpEventType.Response && event.body && event.ok){
        this.listCart = Object(event.body)['cartItems'];
      }
      groupedData = this.listCart?.reduce((acc,curr)=>{
      const vendorId = curr.vendorId;
        if (!acc[vendorId]) {
          acc[vendorId] = [];
        }
        acc[vendorId].push(curr);
        return acc;
      },{});
      const groupArrays = Object.keys(groupedData).map(vendorId => {
        return {
          vendorId,
          cart: groupedData[vendorId]
        };
      });
      this.data = groupArrays;
      this.init();
    })
  }

  init(){
    this.data.forEach(list => {
      if (
        list.cart &&
        Array.isArray(list.cart) &&
        list.cart.length
      ) {
        this.cartData = [
          ...this.cartData,
          { ...list, cart: new MatTableDataSource(list.cart) }
        ];
      } else {
        this.cartData = [...this.cartData, list];
      }
    });
    this.userSelectionMap= new Map<number,SelectionModel<any>>();
    this.dataSource = new MatTableDataSource(this.cartData);
    this.dataSource.data.forEach(row=>{
      this.userSelectionMap.set(row.vendorId, new SelectionModel<any>(true,[]));
    })
    console.log(this.userSelectionMap)
  }

  changeFormatDate(dtae:string){
    let dt = dtae.split(',');
    let dates:string[]=[];
    if(dtae != null){
      for(let i of dt){
        var year = i.substring(6, 10);
        var month = i.substring(3, 5);
        var day = i.substring(0, 2);
        var datePipe = new DatePipe("en-US");
        dates.push(datePipe.transform(new Date(parseInt(year),parseInt(month)-1,parseInt(day)),"dd MMMM YYYY")!)
      }
      return dates.toString();
    }else return '-';
 }

  createBooking(){
    //call dialog booking
    console.log(this.userSelectionMap)
    console.log(this.userSSelection)
    console.log(this.userSelection)
  }

  checkButton():boolean{
    let flag = 0;
    this.data.forEach(e=>{
      if(this.userSelectionMap.get(e.vendorId)!.selected.length>0) flag++;
    })

    if(flag == 1){
      this.error=''; return false;
    }else if(flag > 1) this.error='You can only checkout products from the same vendor'
    else if(flag == 0) this.error='No product selected';
    return true;
  }

  openDialogCart(element:any){
    const dialogRef = this.dialog.open(DialogEditCartComponent, {
      data:element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getDataCart()
    });
  }

  checkIndeterminate(elementId:number){
    return this.userSelectionMap.get(elementId)?.hasValue() && !this.isAllUserSelected(elementId);
  }

  // Child Checkbox
  isAllUserSelected(elementId: number) {
    const numSelected = this.userSelectionMap.get(elementId)!.selected.length;
    let temp = this.dataSource.data.find(x=>x.vendorId == elementId);
    const numRows = temp?.cart?.filteredData!.length;
    return numSelected == numRows;
  }

  UserMasterToggle(elementId: number) {
    this.isAllUserSelected(elementId) ? this.userSelectionMap.get(elementId)!.clear()
      : this.dataSource.data.find(x=>x.vendorId == elementId)?.cart.filteredData.forEach((row: any) =>
          this.userSelectionMap.get(elementId)!.select(row)
        );
  }

  deleteCart(element:any){
    this.deleteItem = true;
    this.tempId = element.vendorId;
  }

  checkDelete(element:any){
    if(this.userSelectionMap.get(element.vendorId)!.selected.length>0)return false;
    return true;
  }

  getError(element:any){
    if(this.userSelectionMap.get(element.vendorId)!.selected.length>0)return '';
    return 'No product selected';
  }

  onDelete(){
    let postDelete:postDelete={
      deletes: []
    };
    this.userSelectionMap.get(this.tempId!)!.selected.forEach(e=>{
      postDelete.deletes.push(e.id);
    })

    this.restService.deleteCart(JSON.stringify(postDelete)).subscribe(event=>{
      if(event.statusCode == 200){
        const dialogRef = this.dialog.open(DialogSuccessComponent, {
          data: 'Success Delete Product From Cart',
        });
        this.deleteItem=false;
        dialogRef.afterClosed().subscribe(result => {
          window.location.reload();
        });
      }else if(event.statusCode == 500){
        // this.error='Email is already registered, please use another email';
        // this.openDialogErrorDiv = true;
      }
    })
  }

}

export interface postDelete{
  deletes:number[];
}

export interface Vendor {
  vendorId:number;
  cart: Product|any | MatTableDataSource<Product>;
}

export interface Product {
  id:number;
  photo:string;
  productId:number;
  productName:string;
  productPrice:number;
  productRating:number;
  quantity: number;
  usernameVendor:string;
  bookdate?: string;
  vendorId?:number;
}
