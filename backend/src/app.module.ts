import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],  // modules that export providers
  controllers: [],  // controllers defined in this module
  providers: [],  // injectables shared across this module
})
export class AppModule {}
