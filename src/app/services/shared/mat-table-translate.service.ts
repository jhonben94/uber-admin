import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MatTableTranslateService {

  translate: TranslateService;
  firstPageLabel = 'Primera Página';
  itemsPerPageLabel = 'Items por página';
  lastPageLabel = 'Última Página';
  nextPageLabel = 'Página Siguiente';
  previousPageLabel = 'Página Anterior';

  getRangeLabel = (page: number, pageSize: number, length: number): string => {
    const of = this.translate ? this.translate.instant('mat-paginator-intl.of') : 'de';
    if (length === 0 || pageSize === 0) {
      return '0 ' + 'de' + ' ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = ((page * pageSize) > length) ?
      (Math.ceil(length / pageSize) - 1) * pageSize:
      page * pageSize;

    const endIndex = Math.min(startIndex + pageSize, length);
    return startIndex + 1 + ' - ' + endIndex + ' ' + 'de' + ' ' + length;
  };

  injectTranslateService(translate: TranslateService) {
    this.translate = translate;

    this.translate.onLangChange.subscribe(() => {
      this.translateLabels();
    });

    this.translateLabels();
  }

  translateLabels() {
    this.firstPageLabel = this.translate.instant('mat-paginator-intl.first_page');
    this.itemsPerPageLabel = this.translate.instant('mat-paginator-intl.items_per_page');
    this.lastPageLabel = this.translate.instant('mat-paginator-intl.last_page');
    this.nextPageLabel = this.translate.instant('mat-paginator-intl.next_page');
    this.previousPageLabel = this.translate.instant('mat-paginator-intl.previous_page');
  }
}
