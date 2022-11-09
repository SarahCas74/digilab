import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: any):number{
if (value) {
    let CurrentYear:any=new Date().getFullYear();
    let BirthYear:any=new Date(value).getFullYear();
    let userAge = CurrentYear-BirthYear;
  
    return userAge;
}
else{
  return 0
}

  }

}
