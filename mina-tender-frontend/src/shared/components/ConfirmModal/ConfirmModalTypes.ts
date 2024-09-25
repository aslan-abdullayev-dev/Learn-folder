export type ConfirmModalType = {
    title: string,
    content: string,
    isConfirmOpen: boolean;
    onOk: (props: any) => any | void;
    onCancel: (props: any) => any | void;
}