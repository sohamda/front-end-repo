import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product, ProductsResponse } from './product.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      name: 'Product A',
      description: 'Description A',
      price: 9.99,
      category: 'electronics',
      landOfOrigin: 'Germany',
      inStock: 50
    },
    {
      name: 'Product B',
      description: 'Description B',
      price: 19.99,
      category: 'clothing',
      landOfOrigin: 'France',
      inStock: 10
    }
  ];

  const mockResponse: ProductsResponse = {
    products: mockProducts,
    total: 2,
    skip: 0,
    limit: 20
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from the API', () => {
    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products[0].name).toBe('Product A');
      expect(products[1].name).toBe('Product B');
    });

    const req = httpMock.expectOne('https://dummyjson.com/products?limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return products with all required fields', () => {
    service.getProducts().subscribe(products => {
      const product = products[0];
      expect(product.name).toBeDefined();
      expect(product.description).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
      expect(product.landOfOrigin).toBeDefined();
      expect(product.inStock).toBeDefined();
    });

    const req = httpMock.expectOne('https://dummyjson.com/products?limit=20');
    req.flush(mockResponse);
  });

  it('should handle array responses from the API', () => {
    service.getProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://dummyjson.com/products?limit=20');
    req.flush(mockProducts);
  });
});
