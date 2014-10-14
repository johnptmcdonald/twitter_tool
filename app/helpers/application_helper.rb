module ApplicationHelper
  def frequencyOfValVars(text)
    text += " " # adds additional space for end case
    # Extract all the potential values from the tweet text
    valArr = findVals(text)

    # Clean the words up
    cleanArr = cleanVals(valArr)

    # Create and combine values into a hash that has values of the frequency
    indexVals(cleanArr)
  end

  def findVals(text)
    # Initialize
    f = 0
    valArr = []

    # Find Vals
    text.length.times do |i|
      if text[i] == " "
        extractVal = text.slice(f..i)
        valArr << extractVal
        f = i + 1
      end
    end
    valArr 
  end


  def cleanVals(valArr)
    # Vals we don't care about, starting list, todo: robust list
    stupidVals = ['a', 'an', 'all', 'and', 'at', 'be', 'by', 'do', 'does', 'during', 'each',
      'every', 'for', 'me', 'the', 'us', 'we']
    trailingSymbols = /[,;:!#&()-\.\?\*\+\^\ ]/
    cleanArr = []

    valArr.each do |val|
      val.downcase!
      # Trailing symbols
      while ((val[-1] =~ trailingSymbols) != nil) # Symbols regex that can be expanded later
        val.chop!
      end 
      # Beginning symbols, (keeps hash words but removes hash!)
      while ((val[0] =~ trailingSymbols) != nil) # Symbols regex that can be expanded later
        val[0] = ''
      end 
      # Removes words under 3 characters
      cleanArr << val if val.length > 2
    end
    # Remove duplicates
    cleanArr.uniq!
    # Remove blanks strings
    cleanArr.reject!(&:empty?)
    # Remove stupidVals
    cleanArr -= stupidVals
    # todo: Remove hashtags values not just hashtags?
    
    cleanArr
  end

  def indexVals(cleanArr)
    cleanArr.each do |k|
      if $frequencyHash[k].nil?
        $frequencyHash[k] = 1 
      else
        $frequencyHash[k] += 1
      end
    end
    $frequencyHash
  end
end
