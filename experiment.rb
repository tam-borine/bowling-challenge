stars = "****\n ***\n  **\n   *"
arr = stars.split("")
ans =  arr.map { |star|  if rand > 0.5 ; star = " "; else star ; end }
puts ans.join("")


