import { notification } from "antd";
import { IconType } from "antd/es/notification/interface";

type UtilsGetData = {
  title?: string;
  text?: string;
  callback?: () => void;
  type?: string;
};


class Utils {
  static notify = {
    error(obj: UtilsGetData) {
      const { title: getDataTitle, text, callback } = this.getData(obj);
      const title = getDataTitle == undefined ? "Error!" : getDataTitle;
      this.run("error", title, text, callback);
    },
    warning(obj: UtilsGetData) {
      const { title: getDataTitle, text, callback } = this.getData(obj);
      const title = getDataTitle == undefined ? "Warning!" : getDataTitle;
      this.run("warning", title, text, callback);
    },
    success(obj: UtilsGetData) {
      const { title: getDataTitle, text, callback } = this.getData(obj);
      const title =
        getDataTitle == undefined ? "Successful!" : getDataTitle;
      this.run("success", title, text, callback);
    },
    info(obj: UtilsGetData) {
      const { title: getDataTitle, text, callback } = this.getData(obj);
      const title =
        getDataTitle == undefined ? "Info!" : getDataTitle;
      this.run("info", title, text, callback);
    },
    getData(obj: UtilsGetData): UtilsGetData {
      const title = obj["title"] !== undefined ? obj["title"] : undefined;
      const text = obj["text"] !== undefined ? obj["text"] : "Mesaj Yok";
      const callback =
        obj["callback"] !== undefined ? obj["callback"] : undefined;
      return { title, text, callback };
    },
    run(type: IconType, title?: string, text?: string, callback?: () => void) {
      notification.open({
        type: type,
        message: title,
        description: text,
        onClick: () => {
          if (callback !== undefined) {
            callback();
          }
        },
      });
    },
  };
}

export default Utils;
