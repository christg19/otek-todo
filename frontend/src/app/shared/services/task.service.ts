import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { Task } from '../interfaces/task.interface';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = `${environment.apiUrl}/api/Tasks`;

    constructor(private httpClient: HttpClient) { }

    getAllTasks(){
        return this.httpClient.get(`${this.apiUrl}`);
    }

    getOneTask(id:number){
        return this.httpClient.get(`${this.apiUrl}/${id}`);
    }

    createTask(formData: any){
        return this.httpClient.post(`${this.apiUrl}`, formData);
    }

    updateTask(id:number, task:Task){
        return this.httpClient.put(`${this.apiUrl}/${id}`, task);
    }

    deleteTask(id:number){
        return this.httpClient.delete(`${this.apiUrl}/${id}`);
    }
}
