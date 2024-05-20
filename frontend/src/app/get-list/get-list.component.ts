import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/interfaces/task.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, MatSelectChange, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.css'],
})
export class GetListComponent implements OnInit {
  taskList: Task[] = [];
  isChecked: boolean = false;
  updating: boolean = false;
  isLoading: boolean = false;
  taskId: number | null = null;
  selectedFilter: string;
  taskForm!: FormGroup;
  displayedColumns: string[] = ['title', 'description', 'isCompleted', 'actions'];
  dataSource = new MatTableDataSource<Task>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('content') dialogTemplate!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(private dialog: MatDialog, private taskService: TaskService, private fb: FormBuilder, private paginators: MatPaginatorIntl) {
    this.taskForm = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
      IsCompleted: [false],
    });

    this.paginators.itemsPerPageLabel = "Registros por página";
    this.paginators.nextPageLabel = "Siguiente página";
    this.paginators.previousPageLabel = "Página anterior";
    this.paginators.lastPageLabel = "Ultima página";
    this.paginators.firstPageLabel = "Primera página";

    this.paginators.getRangeLabel = (page, pageSize, length) => {
      return this.spanishRangeLabel(page, pageSize, length);
    };
  }

  ngOnInit() {
    this.isLoading = true;
    this.getTaskList();
    setTimeout(() => {
      this.isLoading = false;
    }, 500)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getTaskList(): void {
    this.taskService.getAllTasks().subscribe({
      next: (tasks: Task[]) => {

        this.taskList = tasks;
        this.dataSource.data = this.taskList;

      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }

  spanishRangeLabel(page: number, pageSize: number, length: number): string {
    if (length == 0 || pageSize == 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  }

  openDialog(task?: Task): void {
    if (task) {
      this.updating = true;
      this.taskId = task.id;
      this.taskForm.patchValue({
        Title: task.title,
        Description: task.description,
        IsCompleted: task.isCompleted,
      });
    } else {
      this.updating = false;
      this.taskId = null;
      this.taskForm.reset();
    }

    this.dialogRef = this.dialog.open(this.dialogTemplate, { width: '500px', height: '500px', panelClass: 'custom-dialog-container' });

    this.dialogRef.afterClosed().subscribe(() => {
      console.log('El diálogo fue cerrado');
      this.updating = false;
      this.taskForm.reset();
    });
  }


  verifyCheckbox(event: MatCheckboxChange, task: Task): void {
    this.isChecked = event.checked;
    task.isCompleted = event.checked;

    this.taskService.updateTask(task.id!, task).subscribe({
      next: () => {
        this.getTaskList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  filterSelect(event: MatSelectChange) {
    if (event.value === '1') {
      this.dataSource.data = this.taskList.filter(task => task.isCompleted === true);
    } else if (event.value === '2') {
      this.dataSource.data = this.taskList.filter(task => task.isCompleted === false);
    } else {
      this.dataSource.data = this.taskList;
    }
  }

  createOneTask(task: Task) {
    this.taskService.createTask(task).subscribe({
      next: () => {
        this.dialogRef.close();
        this.getTaskList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  updateOneTask(id: number, task: Task) {
    task.id = id;
    this.taskService.updateTask(id, task).subscribe({
      next: () => {
        this.dialogRef.close();
        this.getTaskList();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      if (this.updating && this.taskId !== null) {
        this.updateOneTask(this.taskId, task);
      } else {
        this.createOneTask(task);
      }
    }
  }

  deleteOneTask(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.getTaskList();
      },
      error: (error: Error) => {
        console.error(error);
      },
    });
  }
}
