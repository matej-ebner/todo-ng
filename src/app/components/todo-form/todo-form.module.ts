import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared-modules/shared/shared.module';
import { TodoFormComponent } from './todo-form.component';

@NgModule({
    declarations: [TodoFormComponent],
    imports: [SharedModule],
    exports: [TodoFormComponent],
})
export class TodoFormModule {}
