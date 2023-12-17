import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  // code for search pipe
  transform(items: any[], searchText: string): any[] {
    // checks if items or searchText is falsy (null, undefined, empty string). If either is falsy, it returns the original items array without filtering.
    if (!items || !searchText) {
      return items;
    }

    searchText = searchText.toLowerCase();

    return items.filter(item => 
      {
        return Object.keys(item).some(key => 
          {
            const value = item[key];
            return value !== null && value !== undefined && value.toString().toLowerCase().includes(searchText);
          });
      });
  }
}
