import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
public class StreamApi {
    public static void main(String[] args) {
        List<Integer> num=Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8);
        List<Integer> evenNum =num.stream().filter(n -> n % 2 == 0).collect(Collectors.toList());
        System.out.println(evenNum);
    }
}