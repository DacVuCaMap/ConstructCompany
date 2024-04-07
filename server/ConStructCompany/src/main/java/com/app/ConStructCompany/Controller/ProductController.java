package com.app.ConStructCompany.Controller;

import com.app.ConStructCompany.Entity.Product;
import com.app.ConStructCompany.Request.ProductAddRequest;
import com.app.ConStructCompany.Request.ProductEditRequest;
import com.app.ConStructCompany.Service.ProductService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/product")
public class ProductController {
    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add-product")
    public ResponseEntity<?> addProduct(@RequestBody @Valid ProductAddRequest productAddRequest){
        Product product = productService.addProduct(productAddRequest);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/edit-product")
    public ResponseEntity<?> editProduct(@RequestBody @Valid ProductEditRequest productEditRequest){
        Product product = productService.editProduct(productEditRequest);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Sản phẩm đã được xóa thành công");
    }

    @GetMapping("/get")
    public ResponseEntity<?> getProducts(
           @RequestParam(value = "size", required = false) Integer size,
           @RequestParam(value = "page", required = false) Integer page,
           @RequestParam(value = "filter", required = false) String filter
        ){
        if(filter==null || filter.isEmpty()){
            PageRequest pageRequest = PageRequest.of(page,size);
            Page<Product> productPage = productService.findByDeletedFalse(pageRequest);
            return ResponseEntity.ok(productPage);
        }
        if(filter=="create"){
            PageRequest pageRequest = PageRequest.of(page,size, Sort.by("create_at").descending());
            Page<Product> productPage = productService.findAll(pageRequest);
            return ResponseEntity.ok(productPage);
        }
        if(filter=="inventory"){
            PageRequest pageRequest = PageRequest.of(page,size, Sort.by("inventory").descending());
            Page<Product> productPage = productService.findByDeletedFalse(pageRequest);
            return ResponseEntity.ok(productPage);
        }
        if(filter=="price"){
            PageRequest pageRequest = PageRequest.of(page,size, Sort.by("price").descending());
            Page<Product> productPage = productService.findByDeletedFalse(pageRequest);
            return ResponseEntity.ok(productPage);
        }
        return ResponseEntity.badRequest().body("Invalid filter parameter.");
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchProductByName(
            @RequestParam("name") String name,
            @RequestParam("page") int page,
            @RequestParam("size") int size){
        PageRequest pageRequest = PageRequest.of(page, size);
        Page<Product> productPage = productService.findByDeletedFalseAndNameContaining(name, pageRequest);
        return ResponseEntity.ok(productPage);
    }
}






