import { ValidationOptions, registerDecorator } from 'class-validator';

export const CompareConfirmPasswordWithPassword = (
  property?: string,
  validationOptions?: ValidationOptions,
) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'compareConfirmPasswordWithPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, validationArguments) {
          const password = validationArguments.object['password'];
          return value == password;
        },

        defaultMessage() {
          return 'Passwords must be the same';
        },
      },
    });
  };
};
