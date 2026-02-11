import { NgModule } from '@angular/core';

// NG ZORRO IMPORTS
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  exports: [
    NzLayoutModule,
    NzFormModule,
    NzInputModule,
    NzSpinModule,
    NzButtonModule,
    NzSelectModule,
    NzDatePickerModule
  ]
})
export class NgZorroModule { }
