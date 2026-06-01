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
    { id: 1, title: 'Product A', price: 9.99, category: 'electronics', brand: 'BrandX', stock: 50, rating: 4.5 },
    { id: 2, title: 'Product B', price: 19.99, category: 'clothing', brand: 'BrandY', stock: 10, rating: 3.8 }
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
      expect(products[0].title).toBe('Product A');
      expect(products[1].title).toBe('Product B');
    });

    const req = httpMock.expectOne('https://dummyjson.com/products?limit=20');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should return products with all required fields', () => {
    service.getProducts().subscribe(products => {
      const product = products[0];
      expect(product.id).toBeDefined();
      expect(product.title).toBeDefined();
      expect(product.price).toBeDefined();
      expect(product.category).toBeDefined();
      expect(product.brand).toBeDefined();
      expect(product.stock).toBeDefined();
      expect(product.rating).toBeDefined();
    });

    const req = httpMock.expectOne('https://dummyjson.com/products?limit=20');
    req.flush(mockResponse);
  });
});
