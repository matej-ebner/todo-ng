import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

import { Dictionary } from "src/app/enums/dictionary.enum";

import { TodoDTO } from "src/app/interfaces/todo-dto.interface";

import { FormsService } from "src/app/services/forms.service";
import { TodoApiService } from "src/app/services/todo-api.service";

@Component({
  selector: "td-todo-form",
  templateUrl: "./todo-form.component.html",
  styleUrls: ["./todo-form.component.scss"],
})
export class TodoFormComponent implements OnInit, OnDestroy {
  dictionary = Dictionary;
  @Input() todo?: TodoDTO;

  todoForm: FormGroup;

  saveTodoSubscription: Subscription;

  constructor(
    public formsService: FormsService,
    private todoApiService: TodoApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initTodoForm();
  }

  private initTodoForm(): void {
    let name = this.todo ? this.todo.name : null;
    let description = this.todo ? this.todo.description : null;
    let date = this.todo ? this.todo.date : null;
    let status = this.todo ? this.todo.status : null;

    this.todoForm = new FormGroup({
      name: new FormControl(name, [
        Validators.required,
        this.formsService.noEmptySpaceValidator,
        this.formsService.onlyAlphabetCharactersValidator(),
      ]),
      description: new FormControl(description, [
        Validators.required,
        this.formsService.noEmptySpaceValidator,
      ]),
      date: new FormControl(date, [
        Validators.required,
        this.formsService.noEmptySpaceValidator,
      ]),
      status: new FormControl(status, [
        Validators.required,
        this.formsService.noEmptySpaceValidator,
      ]),
    });

    if (this.todo) {
      this.todoForm.addControl("id", new FormControl(this.todo.id, []));
    }
  }

  saveTodo() {
    const formData = this.todoForm.value;

    this.saveTodoSubscription = this.todoApiService
      .saveTodoRequest(formData)
      .subscribe((response: TodoDTO[]) => {
        this.router.navigate(["/"]);
      });
  }

  ngOnDestroy(): void {
    if (this.saveTodoSubscription) {
      this.saveTodoSubscription.unsubscribe();
    }
  }
}
