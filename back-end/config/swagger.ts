import path from 'node:path'
import url from 'node:url'
export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'PassionLecture API',
  version: '1.0.0',
  description: 'Documentation de l’API pour le site PassionLecture de Stepan et Camille',
  tagIndex: 2,
  productionEnv: 'production', // optional
  info: {
    title: 'PassionLecture API',
    version: '1.0.0',
    description: 'Documentation de l’API pour le site PassionLecture de Stepan et Camille',
  },
  snakeCase: true,
  debug: false, // set to true, to get some useful debug output
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT', // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  //securitySchemes: {}, // optional
  //authMiddlewares: ['auth', 'auth:api'], // optional
  defaultSecurityScheme: 'BearerAuth', // optional
  persistAuthorization: true, // persist authorization between reloads on the documentation page, optional
  showFullPath: false, // the path displayed after endpoint summary

  // pour éviter les erreur de CORS sur la documentation Swagger par rapport a defaultSecurityScheme
  //securitySchemes: {
  //BearerAuth: {
  //type: 'http',
  //scheme: 'bearer',
  //},
  //},
}
