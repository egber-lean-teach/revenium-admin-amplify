export class UtilInfrastructure {
  private baseUrl: string = `https://main.dn2z7s6cf30is.amplifyapp.com/api`;

  constructor(baseUrlClient?: string) {
    this.baseUrl = baseUrlClient || this.baseUrl;
  }
  private getHeaders(
    headers: Record<string, string> = {}
  ): Record<string, string> {
    return {
      "Content-Type": "application/json",
      ...headers,
    };
  }

  public async fetApi<B>(
    url: string,
    method: string,
    headers?: Record<string, string>,
    body?: B
  ) {
    const response = await fetch(url, {
      headers: headers || undefined,
      method,
      body: JSON.stringify(body) || undefined,
    });
    return response;
  }

  public async get<T>(endpoint: string): Promise<T> {
    try {
      const headers = this.getHeaders();
      const response = await this.fetApi(
        `${this.baseUrl}/${endpoint}`,
        "GET",
        headers
      );
      console.log("response", response);
      return await response.json();
    } catch (error: unknown) {
      throw error;
    }
  }

  public async post<B, T>(endpoint: string, request: B): Promise<T> {
    try {
      const headers = this.getHeaders();
      const response = await this.fetApi<B>(
        `${this.baseUrl}/${endpoint}`,
        "POST",
        headers,
        request
      );
      console.log("response", response);
      return await response.json();
    } catch (error: unknown) {
      throw error;
    }
  }

  public async put<B, T>(endpoint: string, request: B, id: string): Promise<T> {
    try {
      const headers = this.getHeaders();
      const response = await this.fetApi<B>(
        `${this.baseUrl}/${endpoint}?id=${id}`,
        "PUT",
        headers,
        request
      );
      console.log("response", response);
      return await response.json();
    } catch (error: unknown) {
      throw error;
    }
  }

  public async delete<T>(endpoint: string, id: string): Promise<T> {
    try {
      const headers = this.getHeaders();
      const response = await this.fetApi(
        `${this.baseUrl}/${endpoint}?id=${id}`,
        "DELETE",
        headers
      );
      console.log("response", response);
      return await response.json();
    } catch (error: unknown) {
      throw error;
    }
  }
}
