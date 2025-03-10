import { container } from "tsyringe";
import TextService from "../services/texts.service";
import TextRepository from "../repositories/texts.repository";

container.registerSingleton<TextService>(TextService);
container.registerSingleton<TextRepository>(TextRepository);
