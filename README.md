react-envify-benchmark
----------------------

Compare the bundle times of React using [envify](https://github.com/hughsk/envify) and [loose-envify](https://github.com/zertosh/loose-envify).

## Benchmark

```
envify:

  $ for i in {1..5}; do node bench.js 'envify'; done
  1614ms
  1597ms
  1643ms
  1544ms
  1575ms

loose-envify:

  $ for i in {1..5}; do node bench.js 'loose-envify'; done
  1101ms
  1085ms
  1089ms
  1103ms
  1134ms
```
