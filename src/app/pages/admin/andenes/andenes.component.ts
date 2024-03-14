
import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-andenes',
  templateUrl: './andenes.component.html',
  styleUrls: ['./andenes.component.css']
})
export class AndenesComponent {
  isLoading = true;
  showContent = false;
  demoValue: number = 0;
  selectedColor = '#8e1dce'; // Initialize the selected color
  myGroup: FormGroup;
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  radioValue = 'A';
  disabled = true;

  // Upload
  constructor(private msg: NzMessageService) {}
  
  
  colorChanged() {
    console.log('Selected color:', this.selectedColor);
    // Do something with the selected color
  }

  ngOnInit() {
    // Simulate loading time
    this.loadData();

   
  }

  loadData() {
    // Simulate an asynchronous data loading operation
    setTimeout(() => {
      this.isLoading = false;
      this.showContent = true;
    }, 500);
  }

  
  //Checkbox
  log(value: string[]): void {
    console.log(value);
  }
}
