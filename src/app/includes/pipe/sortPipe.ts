import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
})
export class sortPipe  implements PipeTransform {
  transform(array: any, field: string): any[] {
    console.log(array)
    console.log(field)
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}