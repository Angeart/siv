import AsyncNeDB from "../../lib/nedbAsyncWrapper";
import { Member } from "../../utils/typeTraits";
import { stringToEnum } from "@/utils/stringToEnum";

export const TagModelKeys = stringToEnum(["id", "label"]);
type TagModelKeys = typeof TagModelKeys;

export interface TagModel {
  [TagModelKeys.id]: number;
  [TagModelKeys.label]: string;
}

export class Tag {
  private static _instance: Tag;
  private db: AsyncNeDB;
  private constructor() {
    this.db = new AsyncNeDB({
      filename: "database/tag.db",
      autoload: true
    });
  }
  public static get instance() {
    if (!this._instance) {
      this._instance = new Tag();
    }
    return this._instance;
  }

  private _generatePrimary(data: TagModel | number) {
    if (typeof data === "number") {
      return <Pick<TagModel, "id">>{ id: data };
    }
    return <Pick<TagModel, "id">>{ id: data.id };
  }

  public async get(id: Member<TagModel, "id">) {
    return this.db.findOneAsync<TagModel>(this._generatePrimary(id));
  }

  public async set(data: TagModel) {
    return this.db.updateAsync(this._generatePrimary(data), data, {
      upsert: true
    });
  }
}
