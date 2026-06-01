import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductService } from './product.service';
import { of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async () => {
    const mockProductService = jasmine.createSpyObj('ProductService', ['getProducts']);
    mockProductService.getProducts.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [AppComponent, ProductsTableComponent],
      imports: [HttpClientTestingModule],
      providers: [{ provide: ProductService, useValue: mockProductService }]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have title 'Products App'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Products App');
  });

  it('should render title in header', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Products App');
  });
});
