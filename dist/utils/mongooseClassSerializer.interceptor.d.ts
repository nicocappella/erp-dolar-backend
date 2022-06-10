import { ClassSerializerInterceptor, Type } from '@nestjs/common';
declare function MongooseClassSerializerInterceptor(classToIntercept: Type): typeof ClassSerializerInterceptor;
export default MongooseClassSerializerInterceptor;
