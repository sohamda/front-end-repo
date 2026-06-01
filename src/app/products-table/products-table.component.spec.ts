import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ProductsTableComponent } from './products-table.component';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

describe('ProductsTableComponent', () => {
  let component: ProductsTableComponent;
  let fixture: ComponentFixture<ProductsTableComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>;

  const mockProducts: Product[] = [
    {
      name: 'Product A',
      description: 'Description A',
      price: 9.99,
      category: 'electronics',
      landOfOrigin: 'Germany',
      inStock: 50,
      owner: 'Alice'
    },
    {
      name: 'Product B',
      description: 'Description B',
      price: 19.99,
      category: 'clothing',
      landOfOrigin: 'France',
      inStock: 0,
      owner: 'Bob'
    }
  ];

  beforeEach(async () => {
    mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);
    mockProductService.getProducts.and.returnValue(of(mockProducts));

    await TestBed.configureTestingModule({
      declarations: [ProductsTableComponent],
      providers: [{ provide: ProductService, useValue: mockProductService }]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display products in the table', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
  });

  it('should display correct product data in each row', () => {
    const firstRow = fixture.nativeElement.querySelector('tbody tr');
    expect(firstRow.textContent).toContain('Product A');
    expect(firstRow.textContent).toContain('Description A');
    expect(firstRow.textContent).toContain('electronics');
    expect(firstRow.textContent).toContain('Germany');
  });

  it('should show loading indicator before data arrives', () => {
    component.loading = true;
    component.products = [];
    fixture.detectChanges();
    const loadingEl = fixture.nativeElement.querySelector('.loading');
    expect(loadingEl).toBeTruthy();
    expect(loadingEl.textContent).toContain('Loading');
  });

  it('should show error message when service fails', () => {
    mockProductService.getProducts.and.returnValue(throwError(() => new Error('Network error')));
    component.ngOnInit();
    fixture.detectChanges();
    const errorEl = fixture.nativeElement.querySelector('.error');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Failed to load');
  });

  it('should have all 7 table column headers', () => {
    const headers = fixture.nativeElement.querySelectorAll('thead th');
    expect(headers.length).toBe(7);
    const headerTexts = Array.from(headers).map((h: any) => h.textContent.trim());
    expect(headerTexts).toContain('Name');
    expect(headerTexts).toContain('Description');
    expect(headerTexts).toContain('Price (€)');
    expect(headerTexts).toContain('Category');
    expect(headerTexts).toContain('Land of Origin');
    expect(headerTexts).toContain('InStock');
    expect(headerTexts).toContain('Owner');
  });

  it('should display inStock as 0 when stock is empty', () => {
    const rows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(rows[1].textContent).toContain('0');
  });
});
