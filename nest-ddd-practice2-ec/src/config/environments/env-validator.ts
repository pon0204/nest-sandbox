import { IsEnum, IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

enum NodeEnvEnum {
  Development = 'development',
  Production = 'production',
}

/** バリデーションしたい環境変数がある場合はここに記載する */
export class EnvValidator {
  @IsEnum(NodeEnvEnum)
  NODE_ENV: NodeEnvEnum;

  @IsString()
  LINE_CHANNEL_ACCESS_TOKEN: string;

  @IsString()
  LINE_CHANNEL_SECRET_TOKEN: string;
}

/**
 * ②
 * @param config バリデーション対象の Record<string, any>
 * @returns バリデーション済の Record<string, any>
 */
export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvValidator, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
