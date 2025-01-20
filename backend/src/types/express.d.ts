import 'express';

declare module 'express' {
  export interface Response {
    send_ok: (message: string, data?: any) => Response;
    send_badRequest: (message: string, data?: any) => Response;
    send_created: (message: string, data?: any) => Response;
    send_forbidden: (message: string, data?: any) => Response;
    send_internalServerError: (message: string, data?: any) => Response;
    send_notFound: (message: string, data?: any) => Response;
    send_unauthorized: (message: string, data?: any) => Response;
  }
}
