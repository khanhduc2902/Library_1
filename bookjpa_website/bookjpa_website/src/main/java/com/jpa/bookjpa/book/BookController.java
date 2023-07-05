package com.jpa.bookjpa.book;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@CrossOrigin
@Controller
public class BookController {
	@Autowired
	private BookService service;
	
//	@GetMapping("/")
//	public String getIndex() {
//		return "index";
//	}
	
	@ResponseBody
	@GetMapping("/books")
	public List<Book> getBooksList() {
		return service.getAll();
	}
	
	@ResponseBody
	@GetMapping("/book/{id}")
	public Book getOneBook(@PathVariable int id) {
		return service.getOneBook(id);
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE, path = "/books/add")
	public String addOneBook(@RequestBody Book l) {
		List<Book> exitL = service.findBook(l.getTitle(), l.getAuthor());
		if (!exitL.isEmpty()) {
			return "Book " + l.getTitle() + " va Author " + l.getAuthor() + " da ton tai! Vui long nhap lai";
		} else {
			service.addOneBook(l);
			return "Ban da add thanh cong Book: " + l.getTitle();
		}
	}
	
	@ResponseBody
	@PutMapping("/book/{id}") 
	public String saveOneBook(@PathVariable int id, @RequestBody Book l) {
		List<Book> exitL = service.findBook(l.getTitle(), l.getAuthor());
		if (exitL.size() == 1 && l.getId() != exitL.get(0).getId()) {
			return "Book " + l.getTitle() + " va Author " + l.getAuthor() + " da ton tai! Vui long nhap lai";
		} else {
			Book oL = service.getOneBook(id);
			oL.setTitle(l.getTitle());
			oL.setAuthor(l.getAuthor());
			oL.setGenre(l.getGenre());
			oL.setDate(l.getDate());
			oL.setPage(l.getPage());
			oL.setMota(l.getMota());
			oL.setSold(l.getSold());
			oL.setAnh(l.getAnh());
			oL.setDanhgia(l.getDanhgia());
			oL.setNhanxet(l.getNhanxet());
			service.saveOneBook(oL);
			return "Ban da update thanh cong Book: " + l.getTitle();
		}
	}
	@ResponseBody
	@PutMapping("/book/sold/{id}") 
	public String saveOneBookString(@PathVariable int id, @RequestBody Book l) {
		List<Book> exitL = service.findBook(l.getTitle(), l.getAuthor());
		if (exitL.size() == 1 && l.getId() != exitL.get(0).getId()) {
			return "Book " + l.getTitle() + " va Author " + l.getAuthor() + " da ton tai! Vui long nhap lai";
		} else {
			Book oL = service.getOneBook(id);
		
			oL.setSold(l.getSold());
			
			service.saveOneBook(oL);
			return "Ban da update thanh cong Book: " + l.getTitle();
		}
	}
	
	 @PutMapping("/handleThanhtoan/{id}")
	    @ResponseBody
	    public String handleThanhtoan(@PathVariable int id) {
	        // Thực hiện xử lý thanh toán

	        // Cập nhật trạng thái "sold" của cuốn sách trong hàm handleThanhtoan
	        Book bookToUpdate = service.getOneBook(id);
	        bookToUpdate.setSold(id);
	        service.saveOneBook(bookToUpdate);

	        return "Cập nhật trạng thái 'sold' thành công cho cuốn sách có ID: " + id;
	    }
	
	@ResponseBody
	@DeleteMapping("/books/delete/{id}")
	public String removeBook(@PathVariable int id) {
		try {
			service.removeBook(id);
			return "Ban da xoa thanh cong Book " + String.valueOf(id);
		} catch (Exception e) {
			return "Co loi da xay ra !!!";
		}
	}
	
	@PutMapping("/pay/cart")
	public ResponseEntity<?> saveBookSold(@RequestBody List<Book> books) {
	    int updatedCount = 0;
	    for (Book book : books) {
	        Book existingBook = service.getOneBook(book.getId());
	        if (existingBook != null) {
	            existingBook.setSold(existingBook.getSold() + book.getSold());
	            service.saveOneBook(existingBook);
	            updatedCount++;
	        } else {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                    .body("An error occurred. Payment failed!");
	        }
	    }
	    
	    if (updatedCount == books.size()) {
	        return ResponseEntity.ok("Payment successful! Thank you for your support <3");
	    } else {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
	                .body("An error occurred. Payment failed!");
	    }
	}
	
	@ResponseBody
	@PostMapping("/book/{id}/nhanxet")
	public String addComment(@PathVariable int id, @RequestBody String comment) {
	    Book book = service.getOneBook(id);
	    if (book != null) {
	        // Thêm nhận xét vào cuốn sách
	        book.setNhanxet(comment);
	        service.saveOneBook(book);
	        return "Thêm nhận xét thành công cho cuốn sách " + book.getTitle();
	    } else {
	        return "Không tìm thấy cuốn sách với ID " + id;
	    }
	}
}