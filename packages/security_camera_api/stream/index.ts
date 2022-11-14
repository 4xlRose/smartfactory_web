import { config } from "../config";
import axios from "axios";

interface Stream {
  name: string;
}

export async function getStreams(): Stream[] {
  let res = await axios.get(`${config.url()}/stream`);

}
