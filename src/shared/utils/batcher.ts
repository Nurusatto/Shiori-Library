import { createClient } from "@/shared/lib/supabase/client";

// Универсальный интерфейс события
export interface UserEvent {
  user_id: string;
  event_type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: Record<string, any>; // JSON-объект с любыми полями
  created_at: string;
}

class BatchLogger {
  private queue: UserEvent[] = [];
  private batchSize: number = 10;
  private flushInterval: number = 5000;
  private timer: ReturnType<typeof setInterval> | null = null;
  private supabase = createClient();

  constructor() {
    if (typeof window !== "undefined") {
      this.startTimer();
      window.addEventListener("beforeunload", () => this.flush());
    }
  }

  // Принимаем тип события и его уникальные данные (payload)
  public log(
    eventType: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: Record<string, any> = {},
    userId: string,
  ) {
    const fullEvent: UserEvent = {
      user_id: userId,
      event_type: eventType,
      payload,
      created_at: new Date().toISOString(),
    };

    this.queue.push(fullEvent);

    if (this.queue.length >= this.batchSize) {
      this.flush();
    }
  }

  public async flush() {
    if (this.queue.length === 0) return;

    const batchToSend = [...this.queue];
    this.queue = [];

    try {
      const { error } = await this.supabase
        .from("user_event_logs")
        .insert(batchToSend);

      if (error) {
        console.error("Ошибка сохранения логов:", error);
        this.queue = [...batchToSend, ...this.queue];
      }
    } catch (err) {
      console.error("Сетевая ошибка логгера:", err);
      this.queue = [...batchToSend, ...this.queue];
    }
  }

  private startTimer() {
    this.timer = setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  public destroy() {
    if (this.timer) clearInterval(this.timer);
    this.flush();
  }
}

export const batchLogger = new BatchLogger();
