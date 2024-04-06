package com.app.ConStructCompany.Controller;

import com.app.ConStructCompany.Entity.Product;
import com.app.ConStructCompany.Request.ProductAddRequest;
import com.app.ConStructCompany.Request.ProductEditRequest;
import com.app.ConStructCompany.Service.ProductService;
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

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody ProductAddRequest productAddRequest){
        Product product = productService.addProduct(productAddRequest);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/edit")
    public ResponseEntity<?> editProduct(@RequestBody ProductEditRequest productEditRequest){
        Product product = productService.editProduct(productEditRequest);
        return ResponseEntity.ok(product);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) {
        productService.deleteProductById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Sản phẩm đã được xóa thành công");
    }
}






