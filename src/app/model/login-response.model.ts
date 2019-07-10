export interface Authority {
  authority: string;
}

export interface Details {
  remoteAddress: string;
  sessionId?: any;
}

export interface Authority {
  authority: string;
}

export interface Principal {
  password?: any;
  username: string;
  authorities: Authority[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface LoginResponse {
  authorities: Authority[];
  details: Details;
  authenticated: boolean;
  principal: Principal;
  credentials?: any;
  name: string;
}
