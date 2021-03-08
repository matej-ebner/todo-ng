import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-modules/shared/shared.module';
import { ModalComponent } from './modal.component';

@NgModule({
    declarations: [ModalComponent],
    imports: [SharedModule],
    exports: [ModalComponent],
})
export class ModalModule {}
