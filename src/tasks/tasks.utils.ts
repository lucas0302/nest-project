import { Injectable } from "@nestjs/common";

@Injectable()
export class TeskUtils {
  splitStrig(text: string) {
    return text.split(" ")
  }
}