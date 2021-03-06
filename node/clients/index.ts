import { IOClients } from "@vtex/api";

import Netreviews from "./netreviews";

export class Clients extends IOClients {
  public get netreviews() {
    return this.getOrSet("netreviews", Netreviews);
  }
}
