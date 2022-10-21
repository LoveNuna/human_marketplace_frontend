import { FunctionComponent, ReactNode } from "react";
import { BaseModalProps } from "./BaseModal";
export interface EnablingWalletModalProps extends BaseModalProps {
    renderLoader?: () => ReactNode;
    reset: () => void;
}
export declare const EnablingWalletModal: FunctionComponent<EnablingWalletModalProps>;
//# sourceMappingURL=EnablingWalletModal.d.ts.map