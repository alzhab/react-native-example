import { TMockConfig } from './types'
import mocker from 'mocker-data-generator'

const mock = mocker()

export const MOCK_CONFIG: TMockConfig = {
  '/apartment/send-to-moderation/': {
    POST: {
      responses: {
        200: true,
      },
      defaultResponse: 200,
    },
  },
  '/recover-password/': {
    POST: {
      responses: { 200: true },
      defaultResponse: 200,
    },
  },
  '/send-sms-code/': {
    POST: {
      responses: {
        200: true,
      },
      defaultResponse: 200,
    },
  },
  '/approve-sms-code/': {
    POST: {
      responses: {
        200: true,
      },
      defaultResponse: 200,
    },
  },
  '/main/change-temp-password': {
    POST: {
      responses: {
        200: {
          token: '',
          user: {
            id: 0,
            email: 'string',
            phone: 'string',
            name: 'string',
            surname: 'string',
            patronymic: 'string',
            iin: 'string',
          },
        },
      },
      defaultResponse: 200,
    },
  },
  '/main/tenants-delete/': {
    POST: {
      responses: {
        200: {},
      },
      defaultResponse: 200,
    },
  },
  '/main/tenants-create/': {
    POST: {
      responses: {
        200: {
          is_trial: true,
          temp_password: 'o2c8)213ez’]f8',
          data: 'Сообщение поделиться',
        },
      },
      defaultResponse: 200,
    },
  },
  '/main/tenants-list/': {
    GET: {
      responses: {
        200: {
          count: 1,
          results: [
            {
              name: 'Айзат Аскаровна Саулеева',
              address: 'г. Алматы, ул. Бальзака, д. 4а, кв. 55, 1 подъезд, этаж 5',
            },
          ],
        },
      },
      defaultResponse: 200,
    },
  },
  '/main/apartments-list/': {
    GET: {
      responses: {
        200: {
          count: 1,
          results: [
            {
              region_city: 'region_city',
              street: 'street',
              house: 'house',
              body: 'body',
              block: 'block',
              flat: 'flat',
            },
          ],
        },
      },
      defaultResponse: 200,
    },
  },
  '/main/voting-detail/${id}/': {
    GET: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    POST: {
      responses: {},
      defaultResponse: 200,
    },
    PUT: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    PATCH: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    DELETE: {
      responses: {
        '200': '',
        '204': '',
      },
      defaultResponse: 200,
    },
  },
  '/main/services-list/': {
    GET: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    POST: {
      responses: {},
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/services-all/${amount}': {
    GET: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    POST: {
      responses: {},
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/service-detail/${id}/': {
    GET: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    POST: {
      responses: {},
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/registration/': {
    GET: {
      responses: {},
      defaultResponse: 200,
    },
    POST: {
      responses: {
        '200': '',
        '201': '',
      },
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/change-permissions/': {
    GET: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    POST: {
      responses: {
        '200': '',
        '201': '',
      },
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/authorization/': {
    GET: {
      responses: {},
      defaultResponse: 200,
    },
    POST: {
      responses: {
        '200': '',
        '201': '',
      },
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/application-detail/${id}/': {
    GET: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    POST: {
      responses: {},
      defaultResponse: 200,
    },
    PUT: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    PATCH: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    DELETE: {
      responses: {
        '200': '',
        '204': '',
      },
      defaultResponse: 200,
    },
  },
  '/main/application-create/': {
    GET: {
      responses: {},
      defaultResponse: 200,
    },
    POST: {
      responses: {
        '200': '',
        '201': '',
      },
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/application-config': {
    GET: {
      responses: {
        '200': '',
      },
      defaultResponse: 200,
    },
    POST: {
      responses: {},
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/apartment/add-apartment/': {
    GET: {
      responses: {},
      defaultResponse: 200,
    },
    POST: {
      responses: {
        '200': '',
        '201': '',
      },
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/voting-list-create/': {
    GET: {
      responses: {},
      defaultResponse: 200,
    },
    POST: {
      responses: {
        '200': '',
        '201': '',
      },
      defaultResponse: 200,
    },
    PUT: {
      responses: {},
      defaultResponse: 200,
    },
    PATCH: {
      responses: {},
      defaultResponse: 200,
    },
    DELETE: {
      responses: {},
      defaultResponse: 200,
    },
  },
  '/main/services-list-home/': {
    GET: {
      responses: {
        200: [
          {
            id: 1,
            name_service: 'Test',
            image_logo: 'http://dev.neutronbotarb.com/media/media/services/logo/intuction.png',
          },
          {
            id: 2,
            name_service: 'Суши',
            image_logo:
              'http://dev.neutronbotarb.com/media/media/services/logo/intuction_c2hj68B.png',
          },
        ],
      },
      defaultResponse: 200,
    },
  },
  '/main/news-list': {
    GET: {
      responses: {
        200: {
          count: 20,
          results: Array(10).fill({
            id: 1,
            name: 'string',
            description: 'string',
            image: 'https://dummy.com',
            date: 'string',
          }),
        },
      },
      defaultResponse: 200,
    },
  },
  '/notifications/list/': {
    GET: {
      responses: {
        200: {
          count: 1,
          results: [
            {
              id: 1,
              unread: false,
              title: 'Новое голосование!',
              desc: 'В вашем доме запущено новое голосование',
              date: '12:30',
            },
          ],
        },
      },
      defaultResponse: 200,
    },
  },
  '/main/application-list': {
    GET: {
      responses: {
        200: {
          count: 0,
          results: [],
        },
      },
      defaultResponse: 200,
    },
  },
}

export default MOCK_CONFIG
