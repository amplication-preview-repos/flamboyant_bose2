import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { WalletModuleBase } from "./base/wallet.module.base";
import { WalletService } from "./wallet.service";
import { WalletController } from "./wallet.controller";
import { WalletResolver } from "./wallet.resolver";

@Module({
  imports: [WalletModuleBase, forwardRef(() => AuthModule)],
  controllers: [WalletController],
  providers: [WalletService, WalletResolver],
  exports: [WalletService],
})
export class WalletModule {}
