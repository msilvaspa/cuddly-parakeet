import DefaultFreightCalculator from "./domain/entity/DefaultFreightCalculator";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import ExpressHttpAdapter from "./infra/http/ExpressHttpAdapter";
import RouteConfig from "./infra/http/RouteConfig";

const repositoryFactory = new DatabaseRepositoryFactory();
const expressAdapter = new ExpressHttpAdapter();
const defaultFreightCalculator = new DefaultFreightCalculator();
new RouteConfig(expressAdapter, repositoryFactory, defaultFreightCalculator);
expressAdapter.listen(3000);
