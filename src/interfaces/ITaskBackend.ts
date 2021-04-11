interface ITaskBackend {
    updateTask(taskId: string, status: TaskStatus, progress: number);
    getTask(taskId: string);
    deleteTask(taskId: string);
}

export const enum TaskStatus {
    queued,
    processing
}


export type {
    ITaskBackend
}