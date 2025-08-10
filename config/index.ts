import { Map } from "immutable";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fromJS = <O>(obj: O): IM<O> => Map(obj as any) as any;

export default fromJS({
  NODE_ENV: process.env.NODE_ENV || "",

  JWT_SECRET: process.env.JWT_SECRET || "default-secret",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",

  MYSQL_HOST: process.env.MYSQL_HOST || "127.0.0.1",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "law_advisor",
  MYSQL_USER: process.env.MYSQL_USER || "",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT || "3306", 10),

  TASK_POSITION_GAP: parseInt(process.env.TASK_POSITION_GAP || "10", 10)
  
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IM<O> extends Map<O, any> {
  get<K extends keyof O>(key: K): O[K];
}
