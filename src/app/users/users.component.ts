import { Component, ViewChild, AfterViewInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MasterService } from '../master.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {
public visible:boolean=false;

  public USERS = [
    { "id": 1, "name": "Leanne Graham", "email": "sincere@april.biz", "phone": "1-770-736-8031 x56442" },
    { "id": 2, "name": "Ervin Howell", "email": "shanna@melissa.tv", "phone": "010-692-6593 x09125" },
    { "id": 3, "name": "Clementine Bauch", "email": "nathan@yesenia.net", "phone": "1-463-123-4447" },
    { "id": 4, "name": "Patricia Lebsack", "email": "julianne@kory.org", "phone": "493-170-9623 x156" },
    { "id": 5, "name": "Chelsey Dietrich", "email": "lucio@annie.ca", "phone": "(254)954-1289" },
    { "id": 6, "name": "Mrs. Dennis", "email": "karley@jasper.info", "phone": "1-477-935-8478 x6430" },
    { "id": 7, "name": "Leanne Graham", "email": "sincere@april.biz", "phone": "1-770-736-8031 x56442" },
    { "id": 8, "name": "Ervin Howell", "email": "shanna@melissa.tv", "phone": "010-692-6593 x09125" },
    { "id": 9, "name": "Clementine Bauch", "email": "nathan@yesenia.net", "phone": "1-463-123-4447" },
    { "id": 10, "name": "Patricia Lebsack", "email": "julianne@kory.org", "phone": "493-170-9623 x156" },
    { "id": 11, "name": "Chelsey Dietrich", "email": "lucio@annie.ca", "phone": "(254)954-1289" },
    { "id": 12, "name": "Mrs. Dennis", "email": "karley@jasper.info", "phone": "1-477-935-8478 x6430" }
  ];

  public cols!: Column[];
public lockedCustomers:any=[];
public exportColumns:any;
  @ViewChild('dt') dt: any; // Reference to p-table

  constructor(private ms: MasterService) { }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' },
      { field: 'phone', header: 'Phone' },
      { field: 'email', header: 'Email' },
      { field: 'phone', header: 'Phone' }

    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }))
    this.lockedCustomers = [
    ]
  }

  ngAfterViewInit() {
    this.dt.filterGlobal = this.dt.filterGlobal.bind(this.dt); // Bind the method to the dt context
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.dt.filterGlobal(inputElement.value, 'contains');
    }
  }
  createUser(){
this.visible=true;
  }
  toggleLock(data: any, frozen: boolean, index: number) {
    if (frozen) {
        this.lockedCustomers = this.lockedCustomers.filter((c:any, i:any) => i !== index);
        this.USERS.push(data);
    } else {
        this.USERS = this.USERS.filter((c, i) => i !== index);
        this.lockedCustomers.push(data);
    }

    this.USERS.sort((val1, val2) => {
        return val1.id < val2.id ? -1 : 1;
    });
}
exportPdf() {
  import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
          const doc = new jsPDF.default('p', 'px', 'a4');
          (doc as any).autoTable(this.exportColumns, this.USERS);
          console.log(this.exportColumns)
          doc.save('products.pdf');
      });
  });
}

exportExcel() {
  import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.USERS);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'products');
  });
}
saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
  });
  FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}
}
