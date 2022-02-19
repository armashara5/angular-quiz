import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {

    if(filterText.trim() === "") return list;
    let searchResult = list.filter((user)=> user.id == parseInt(filterText));
    return searchResult;
  }
}
