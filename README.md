# decorum

A classier version of Typescript decorators.

## Usage:

Install the package: `npm i @aldahick/decorum`

```typescript
const controllerDecorum = new ClassDecorum<[string]>();
const Controller = controllerDecorum.decorator;

@Controller("/users")
class UsersController {
  async get(): Promise<User[]> {
    return Users.find();
  }
}

const app = express();
const controllers = controllerDecorum.uses;
for (const controller of controllers) {
  app.use(controller.args[0], () =>
    new controller.target.constructor().get()
  );
}
```
