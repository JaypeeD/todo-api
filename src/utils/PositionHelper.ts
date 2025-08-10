import { TodoTask } from "#/types/Task";
import config from "#config/index";

export default class PositionHelper {
  private static readonly GAP = config.get("TASK_POSITION_GAP");

  public static calculateNewPosition(
    tasks: TodoTask[],
    beforeTaskId: number | null,
  ): number {
    if (beforeTaskId === null || tasks.length === 0) {
      const lastPosition =
        tasks.length > 0 ? tasks[tasks.length - 1].position : 0;
      return lastPosition + this.GAP;
    }

    const beforeTask = tasks.find((task) => task.taskId === beforeTaskId);
    if (!beforeTask) throw new Error("Before task not found");

    const beforeIndex = tasks.findIndex((task) => task.taskId === beforeTaskId);
    const previousTask = beforeIndex > 0 ? tasks[beforeIndex - 1] : null;

    if (previousTask) {
      return Math.floor((previousTask.position + beforeTask.position) / 2);
    }

    return Math.max(1, beforeTask.position - this.GAP);
  }

  public static needsRedistribution(
    newPosition: number,
    beforePosition: number,
  ): boolean {
    return Math.abs(newPosition - beforePosition) < this.GAP / 2;
  }

  public static redistribute(tasks: TodoTask[]): TodoTask[] {
    return tasks.map((task, index) => ({
      ...task,
      position: (index + 1) * this.GAP,
    }));
  }
}
