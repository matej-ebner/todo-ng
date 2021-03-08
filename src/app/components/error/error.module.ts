import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-modules/shared/shared.module';
import { ErrorComponent } from './error.component';

@NgModule({
    declarations: [ErrorComponent],
    imports: [SharedModule],
    exports: [ErrorComponent],
})
export class ErrorModule {}
