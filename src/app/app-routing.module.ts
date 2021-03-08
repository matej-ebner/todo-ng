import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationRoutes } from 'src/app/app-navigation-constants';

const routes: Routes = [
    {
        path: NavigationRoutes.TODO_OVERVIEW,
        loadChildren: () =>
            import('./pages/todo-overview-container/todo-overview-container.module').then(
                m => m.TodoOverviewContainerModule
            ),
    },
    {
        path: NavigationRoutes.NEW_TODO,
        loadChildren: () =>
            import('./pages/new-todo-container/new-todo-container.module').then(
                m => m.NewTodoContainerModule
            ),
    },
    {
        path: NavigationRoutes.EDIT_TODO + '/:id',
        loadChildren: () =>
            import('./pages/edit-todo-container/edit-todo-container.module').then(
                m => m.EditTodoContainerModule
            ),
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            initialNavigation: 'enabled',
            scrollPositionRestoration: 'disabled',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
