package com.crud.Crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path= "/app")
public class DatabaseController {
    @Autowired
    private CustomerRepository customerRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewCustomer (@RequestBody Customer customer) {
        customerRepository.save(customer);
        return "Added new customer";
    }
    @GetMapping(path = "/findall")
    public @ResponseBody Iterable<Customer> findAllCustomers() {
        return customerRepository.findAll();
    }

    @DeleteMapping(path = "/delete")
    public @ResponseBody String deleteCustomer (@RequestBody Customer customer) {
        customerRepository.delete(customer);
        return "Deleted customer";
    }
}